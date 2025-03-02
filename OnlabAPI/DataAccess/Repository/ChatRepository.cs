using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Repository;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repository
{
    public class ChatRepository : IChatRepository
    {
        public DatabaseContext _context;

        public ChatRepository(DatabaseContext dbcontext)
        {
            _context = dbcontext;
        }

        public async Task<List<string>?> GetChats()
        {
            return await _context.Messages.Select(m => m.Sender).Distinct().ToListAsync();
        }

        public async Task<List<Message>?> GetLastMessages(string Name)
        {
            return await _context.Messages.Select(m => m).Where(m => m.Sender == Name || m.Receiver == Name).OrderByDescending(m => m.Timestamp).Take(10).ToListAsync();
        }

        public async Task<bool> PostMessage(Message msg)
        {
            await _context.Messages.AddAsync(msg);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
