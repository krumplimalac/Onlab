using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Domain.Repository;
using Domain.Models;

namespace OnlabAPI
{
    public class ChatHub : Hub
    {
        private readonly IChatRepository _repo;

        public ChatHub(IChatRepository repository)
        {
            _repo = repository;
        }

        public async Task JoinChatRoom(string chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            await LoadMessages(chatId,1);
        }

        public async Task LoadMessages(string chatId,int quantity)
        {
            await Clients.Caller.SendAsync("LoadMessages", await _repo.GetLastMessages(chatId,quantity));
        }

        public async Task GetChats()
        {
            await Clients.Caller.SendAsync("ReceiveChats", await _repo.GetChats());
        }

        public async Task GetAdminId()
        {
            await Clients.Caller.SendAsync("SendAdminId", await _repo.GetAdminId());
        }

        public async Task SendMessage(string chatId, string senderId, string receiverId, string message, DateTime time)
        {
            await Clients.Group(chatId).SendAsync("ReceiveMessage", senderId, message);
            var msg = new Message
            {
                ReceiverId = receiverId,
                SenderId = senderId,
                Text = message,
                Timestamp = time
            };
            await _repo.PostMessage(msg);
        }
    }
}

