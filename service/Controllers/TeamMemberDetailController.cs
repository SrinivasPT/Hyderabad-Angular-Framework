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
  public class TeamMemberDetailController : ControllerBase
  {

    [HttpGet("GetByParentId/{id}")]
    public dynamic GetByParentId(int id)
    {
      var nodes = (new[] {
                new { Id = 1000, TeamMemberId = 100, FirstName = "Srinivas", LastName = "Peeta", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "ACTIVE"},
                new { Id = 2001, TeamMemberId = 1000, FirstName = "Sreelatha", LastName = "Peeta", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "ACTIVE"},
                new { Id = 2002, TeamMemberId = 2001, FirstName = "Anjali", LastName = "Joe", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "ACTIVE"},
                new { Id = 2003, TeamMemberId = 2001, FirstName = "Keerthi", LastName = "Joe", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "ACTIVE"},
                new { Id = 2004, TeamMemberId = 2002, FirstName = "Harry", LastName = "Joe", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "INACTIVE"},
                new { Id = 2005, TeamMemberId = 2002, FirstName = "Beery", LastName = "Joe", Country = "India", JoinDate=DateTime.Now, Comments="Test Comments", Status = "INACTIVE"},
                }).ToList();
      return nodes.Find(node => node.Id == id);
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
