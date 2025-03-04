using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;
using Domain.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace DataAccess.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly DatabaseContext _context;
        private readonly UserManager<IdentityUser> _userManager;


        public ChatRepository(DatabaseContext dbcontext, UserManager<IdentityUser> usermanager)
        {
            _context = dbcontext;
            _userManager = usermanager;
        }

        public async Task<List<List<string>>?> GetChats()
        {
            var userIds = await _context.Messages.Select(m => m.SenderId).Distinct().ToListAsync();
            List<List<string>>? users = [];
            foreach (var userId in userIds)
            {
                var u = await _userManager.FindByIdAsync(userId);
                var userEmail = u.Email;
                List<string?> userData = [];
                userData.Add(userId);
                userData.Add(userEmail);
                var lastMessage = await _context.Messages.Select(m => m).Where(m => m.SenderId == userId || m.ReceiverId == userId).OrderByDescending(m => m.Timestamp).Take(1).SingleAsync();
                userData.Add(lastMessage.Text);
                userData.Add(lastMessage.SenderId);
                users.Add(userData);
            }
            return users;
        }

        public async Task<List<Message>?> GetLastMessages(string id, int quantity)
        {
            return await _context.Messages.Select(m => m).Where(m => m.SenderId == id || m.ReceiverId == id).OrderByDescending(m => m.Timestamp).Take(quantity * 10).ToListAsync();
        }

        public async Task<bool> PostMessage(Message msg)
        {
            var sender = await _userManager.FindByIdAsync(msg.SenderId);
            var receiver = await _userManager.FindByIdAsync(msg.ReceiverId);
            msg.Sender = sender.Email;
            msg.Receiver = receiver.Email;
            await _context.Messages.AddAsync(msg);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GetAdminId()
        {
            var admin = await _userManager.FindByEmailAsync("hunyadyzsombor@gmail.com");
            return admin.Id;
        }
    }
}
