using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace service.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class FormFieldValidationController : ControllerBase
  {

    // Note: Whatever name you provide here will come as argument to the function. So becareful with the names
    [HttpGet("{formName}")]
    public dynamic Get(string formName)
    {

      var nodes = (new[] {
                new { FormName = "detail", FieldName = "firstName", FieldDataType = "String", minLength = 1, maxLength = 50,  required = true},
                new { FormName = "detail", FieldName = "lastName", FieldDataType = "String", minLength = 1, maxLength = 50,  required = false},
                new { FormName = "detail", FieldName = "country", FieldDataType = "String", minLength = 1, maxLength = 50,  required = true},
                new { FormName = "detail", FieldName = "joinDate", FieldDataType = "Date", minLength = 1, maxLength = 50,  required = true},
                // new { FormName = "detail", FieldName = "TotalExperience", FieldDataType = "Integer", minLength = 1, maxLength = 1, 0, required = ""},
                }).ToList();
      return nodes.FindAll(node => node.FormName.ToLower().Equals(formName.ToLower()));
    }

    // POST api/Person
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/Person/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/Person/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
