using System.Web.Mvc;
using System.Linq;
using tweechat.Models;
using System.Diagnostics;
using System.Data.Entity.Validation;

namespace tweechat.Controllers
{
    public class HomeController : Controller
    {
        private Models.tweechatDBEntities db = new Models.tweechatDBEntities();
        protected User user = new User();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register(string email,string password)
        {
            Temp.Email = email;
            user.email = email;
            user.password = password;
            db.Users.Add(user);
            db.SaveChanges();
            return View();
        }

        public ActionResult Finish()
        {
            return View();
        }

        public ActionResult getName(string email)
        {
            var items = db.Users.FirstOrDefault(x => x.email == email);
            return Content(items.language);
        }
        [HttpPost]
        public ActionResult CheckEmail(string email, string password)
        {
            var items = db.Users.FirstOrDefault(x => x.email == email);
            string result = "";
            if (items != null)
            {
                result = items.email;
                return Json(new { email = result });
            }
            else
            {
                return Json("");
            }
        }
        [HttpPost]
        public ActionResult Finish(string name,string surname,string lang,string age,string gender,string country)
        {
            try
            {
                var user = db.Users.Where(x => x.email == Temp.Email).FirstOrDefault();
                user.name = name;
                user.surname = surname;
                user.sex = gender;
                user.age = age;
                user.living_place = country;
                user.language = lang;
                db.SaveChanges();
                return View();
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                return View();
            }
        }
        [HttpPost]
        public ActionResult LogIn(string email,string password)
        {
            var user = db.Users.FirstOrDefault(us => us.email == email);
            if (user != null)
            {
                if (user.password.Equals(password))
                {
                    Session["username"] = user.name;
                    Session["surname"] = user.surname;
                    Session["language"] = user.language;
                    Session["user_id"] = user.user_id;
                    Session["sex"] = user.sex;
                    Session["living_place"] = user.living_place;
                    return RedirectToAction("UserPage", "User", Session["user_id"]);
                }
                else
                {
                    ViewBag.Error = "Не верный пароль!";
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.Error = "Такой пользователь не зарегистрирован!";
                return RedirectToAction("Index", "Home");
            }
        }
    }   
}