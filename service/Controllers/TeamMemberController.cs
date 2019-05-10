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
  public class TeamMemberController : ControllerBase
  {

    [HttpPost("Search")]
    public dynamic Search([FromBody] dynamic criteria)
    {
      var nodes = (new[] {
                new { Id = 1000, TeamMemberId = 100, FirstName = "Srinivas", LastName = "Peeta", Country = "India", Status = "ACTIVE"},
                new { Id = 2001, TeamMemberId = 1000, FirstName = "Sreelatha", LastName = "Peeta", Country = "India", Status = "ACTIVE"},
                new { Id = 2002, TeamMemberId = 2001, FirstName = "Anjali", LastName = "Joe", Country = "India", Status = "ACTIVE"},
                new { Id = 2003, TeamMemberId = 2001, FirstName = "Keerthi", LastName = "Joe", Country = "India", Status = "ACTIVE"},
                new { Id = 2004, TeamMemberId = 2002, FirstName = "Harry", LastName = "Joe", Country = "India", Status = "INACTIVE"},
                new { Id = 2005, TeamMemberId = 2002, FirstName = "Beery", LastName = "Joe", Country = "India", Status = "INACTIVE"},
                }).ToList();
      return nodes.FindAll(node => node.Status == criteria.selectedTab.ToString());
    }

    [HttpGet("{id}")]
    public dynamic Get(int id)
    {
      var nodes = (new[] {
                new { Id = 1000, TeamMemberId = 100, FirstName = "Srinivas", LastName = "Peeta", Country = "India", Status = "ACTIVE"},
                new { Id = 2001, TeamMemberId = 1000, FirstName = "Sreelatha", LastName = "Peeta", Country = "India", Status = "ACTIVE"},
                new { Id = 2002, TeamMemberId = 2001, FirstName = "Anjali", LastName = "Joe", Country = "India", Status = "ACTIVE"},
                new { Id = 2003, TeamMemberId = 2001, FirstName = "Keerthi", LastName = "Joe", Country = "India", Status = "ACTIVE"},
                new { Id = 2004, TeamMemberId = 2002, FirstName = "Harry", LastName = "Joe", Country = "India", Status = "INACTIVE"},
                new { Id = 2005, TeamMemberId = 2002, FirstName = "Beery", LastName = "Joe", Country = "India", Status = "INACTIVE"},
                }).ToList();
      return nodes.Find(node => node.Id == id);
    }

    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
