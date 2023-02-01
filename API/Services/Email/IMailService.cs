namespace DAFwebAPI.Services
{
    public interface IMailService
{
    Task SendEmailAsync(MailRequest mailRequest);
}
}