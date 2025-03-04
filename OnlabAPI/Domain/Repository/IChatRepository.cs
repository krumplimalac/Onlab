using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repository
{
    public interface IChatRepository
    {
        Task<List<Message>?> GetLastMessages(string id, int quantity);
        Task<bool> PostMessage(Message msg);
        Task<List<List<string>>?> GetChats();
        Task<string> GetAdminId();
    }
}
