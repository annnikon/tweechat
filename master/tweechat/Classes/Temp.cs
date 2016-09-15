using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace tweechat.Controllers
{
    public static class Temp
    {
        private static string email;
        public static string Email
        {
            get{ return email; }
            set { email = value; }
        }
    }
}