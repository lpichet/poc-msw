using Microsoft.Extensions.Caching.Memory;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
builder.Services.AddCors(options => options.AddDefaultPolicy(builder => 
    builder.WithOrigins("http://localhost:5173", "http://127.0.0.1:5173")
        .WithMethods("GET", "POST")
        .WithHeaders("Content-Type"))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    var memoryCache = app.Services.GetRequiredService<IMemoryCache>();
    memoryCache.Set("users", new List<User>
    {
        new User("laurent.pichet@philips.com"),
        new User("jonathan.antoine@philips.com"),
    });
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors();
}

app.UseHttpsRedirection();

app.MapGet("/user", (IMemoryCache cache) =>
{
    return cache.Get("users");
})
.WithName("GetUsers");

app.MapPost("/user", (IMemoryCache cache, User u) =>
{
    var users = cache.Get<List<User>>("users") ?? new List<User>();
    users.Add(u);
    cache.Set("users", users);
    return Results.Created($"/users/{users.Count}", u);
})
.WithName("AddUser");

app.Run();

internal record User(string email);
