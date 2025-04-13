from channels.generic.websocket import AsyncWebsocketConsumer
import json


last_added_id = 0

initial_available_room = {
    'room_id':"",
    'cards':"",
    'status':""
}
rooms = {
    'match_rooms':[],
    'available_room':initial_available_room
}

class MatchConsumer(AsyncWebsocketConsumer):
    #  connect method ------------->>>>>>>>>>>>>
    async def connect(self):
        global last_added_id

        if self.check_available_room():
            await self.join_available_room()
        else:
            await self.create_new_room()

    #  receive method ------------->>>>>>>>>>>>>
    async def receive(self, text_data=None):
        data = json.loads(text_data)
        message_type = data['type']

        if message_type == "shuffled_cards":
            await self.send_shuffled_cards(data)

        if message_type == "start_game":
            await self.send_start_game_message(data)

        if message_type == "card_call":
            await self.send_card_call_message(data)

    #  disconnect method ------------->>>>>>>>>>>>>
    async def disconnect(self, code):
        await self.send_disconnect_message()

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        
        if rooms['available_room']['room_id'] == self.room_group_name:
            rooms['available_room'] = initial_available_room

        rooms['match_rooms'] = [
            room for room in rooms['match_rooms']
            if room['room_id'] != self.room_group_name
        ]

    def get_uniq_id_for_room(self):       
        global last_added_id
        last_added_id = last_added_id+1
        return last_added_id
    
    
    def check_available_room(self):
        available_room = rooms['available_room']
        if(available_room['status'] == 'ready'):
            return True
        return False
    
    
    async def create_new_room(self):
        self.user_id = self.get_uniq_id_for_room()
        self.room_group_name = f"anonymous_users_room_{self.user_id}"
        current_room = {
            'room_id':self.room_group_name,
            'status':"ready"
        }
        rooms['available_room'] = current_room
        await self.add_to_group()
        
        await self.accept()

        await self.send(json.dumps({
            'type':"room_creator"
        }))

    
    async def join_available_room(self):
        self.room_group_name = rooms['available_room'].get('room_id')
        await self.add_to_group()
        rooms['match_rooms'].append(rooms['available_room'])
        rooms['available_room'] = initial_available_room
        
        await self.accept()
        await self.send_room_ready_message()


    async def add_to_group(self):
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)


    async def send_card_call(self, event):
        await self.send(json.dumps({
            'type':'user_card_call',
            'data':event
        }))

    # room ready action handle
    async def send_room_ready_message(self):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"broadcast_room_ready_message",
            }     
        )

    async def broadcast_room_ready_message(self, event):
        await self.send(json.dumps({
            'type':"room_ready_to_play"
        }))
    # room ready action ends

    # shuffled cards sharing from room creator handle
    async def send_shuffled_cards(self,data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"broadcast_shuffled_cards",
                'data':data
            }     
        )

    async def broadcast_shuffled_cards(self, event):
        await self.send(json.dumps(event['data']))
    # shuffled cards sharing from room creator handle ends


    # start game handle
    async def send_start_game_message(self,data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"broadcast_start_game_message",
                'data':data
            }     
        )

    async def broadcast_start_game_message(self, event):
        await self.send(json.dumps(event['data']))
    # start game handle ends

    # card call handle
    async def send_card_call_message(self,data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"broadcast_card_call_message",
                'data':data
            }     
        )

    async def broadcast_card_call_message(self, event):
        await self.send(json.dumps(event['data']))
    # card call handle ends

    # send disconnect message handle
    async def send_disconnect_message(self):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':"broadcast_disconnect_message"
            }
        )

    async def broadcast_disconnect_message(self, event):
        await self.send(json.dumps({
            'type':"opponent_left"
        }))