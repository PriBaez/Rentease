using System.Security.Cryptography;
using System.Text;

namespace SDGAV.Services 
{

    public static class EncryptService 
    {
        public static string encryptPassword(MD5 md5, string pwd)
        {
            //compute hash from the bytes of text  
            byte[] result = md5.ComputeHash(Encoding.UTF8.GetBytes(pwd));  
        
            StringBuilder strBuilder = new StringBuilder();  
            for (int i = 0; i < result.Length; i++)  
            {  
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));  
            }  

            return strBuilder.ToString();     

        }

    }
}