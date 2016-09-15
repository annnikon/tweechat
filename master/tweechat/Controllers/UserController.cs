using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using tweechat.Models;
using System.Web.Mvc;

namespace tweechat.Controllers
{
   
    public class UserController : Controller
    {
        private Models.tweechatDBEntities db = new Models.tweechatDBEntities();
        public ActionResult Index()
        {
            return View("UserPage");
        }
        public ActionResult UserPage()
        {
            return View();
        }
    }
}