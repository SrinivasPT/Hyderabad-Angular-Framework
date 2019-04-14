using System;
using System.Collections.Generic;

namespace Service.Model
{
  public partial class AppUser
  {
    public AppUser(string lanId, string userName) : base()
    {
      LanId = lanId;
      UserName = userName;
    }
    public string LanId { get; set; }
    public string UserName { get; set; }
  }

  public class JwtSettings
  {
    public string Key { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int MinutesToExpiration { get; set; }
  }

  public class AppUserAuth
  {
    public AppUserAuth() : base()
    {
      FirstName = "Not authorized";
      BearerToken = string.Empty;
    }

    public string LandId { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string BearerToken { get; set; }
    public bool IsAuthenticated { get; set; }

    public List<AppUserClaim> Claims { get; set; }
  }

  public class AppUserClaim
  {
    public AppUserClaim(string claimType, string claimValue) : base()
    {
      ClaimType = claimType;
      ClaimValue = claimValue;
    }
    public string ClaimType { get; set; }
    public string ClaimValue { get; set; }
  }

}
