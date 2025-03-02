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
        private IChatRepository _repo;

        public ChatHub(IChatRepository repository)
        {
            _repo = repository;
        }

        public async Task JoinChatRoom(string chatName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatName);
            await Clients.Group(chatName).SendAsync("LoadMessages", await _repo.GetLastMessages(chatName));
        }

        public async Task GetChats()
        {
            await Clients.Caller.SendAsync("ReceiveChats", await _repo.GetChats());
        }

        public async Task SendMessage(string chatName, string sender, string receiver, string message, string time)
        {
            await Clients.Group(chatName).SendAsync("ReceiveMessage", sender, message);
            var msg = new Message
            {
                Receiver = receiver,
                Sender = sender,
                Text = message,
                Timestamp = time
            };
            await _repo.PostMessage(msg);
        }
    }
}

