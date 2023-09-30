using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers;

public class BuggyController :BaseApiController
{
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ProblemDetails()
        {
            Title = "Bad request"
        });
    }
    
    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
        return Unauthorized();
    }
    
    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
        ModelState.AddModelError("Problem", "This is a validation error");
        return ValidationProblem();
    }
    
    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        throw new Exception("Internal server error");
    }
}