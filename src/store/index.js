import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
    state(){
        return {
            notes : [],
            token : '',
            user : {}
        }
    },
    mutations : {
        logout(state){
            state.notes = [];
            state.token = '';
            state.user = {}
            localStorage.clear();
        }
    },
    actions : {
        logout(context){
            context.commit('logout');
            alert("You logged out successfully");
        },
        async signupLoginForm(context,payload) {
            try {
                
                let response = await axios.post(`https://taskprojectpanda.herokuapp.com/user/` + payload.mode, {
                    email: payload.email,
                    password: payload.password
                });
                console.log(response)
                // console.log(response.data);
                const { token,user } = response.data;
                console.log('token ',token);
                console.log('user',user);
                context.state.token = token;
                context.state.user = user;
                localStorage.setItem('user',JSON.stringify(user));
                localStorage.setItem('token',token);    
            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
            }
        },
        async updateForm(context,payload) {
            try {
                // console.log(payload);
                // console.log(context.state.token);
                if(payload.new_password !== payload.reentered_new_password){
                    throw new Error('New and Reentered Password are not matching')
                }

                const response = await axios.patch('https://taskprojectpanda.herokuapp.com/user/update/me', {
                    old_password: payload.old_password,
                    new_password : payload.new_password,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.token
                    }
                });
                if(response && response.status !== 200){
                    console.log('updation error occurred')
                    throw new Error('updation error occurred');
                } 
            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
            }
        }, 
        async showNotes(context) {
            try {
                console.log(context.state.token,'context state token');
                const response = await axios.get('https://taskprojectpanda.herokuapp.com/task/read/me',{ headers: {"Authorization" : `Bearer ${context.state.token}`} });
                console.log(response);
                context.state.notes = response.data;

            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
                
            }
        },
        async addNote(context,{ title, description }) {
            try {
                const response = await axios.post('https://taskprojectpanda.herokuapp.com/task/create', {
                    title,
                    description
                },{
                    headers: {
                        'Authorization': 'Bearer ' + context.state.token
                    }
                });
                console.log(response);
                await context.dispatch('showNotes');

            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
            }
        },
        async deleteNote(context,id) {
            try {
                const response = await axios.delete(`https://taskprojectpanda.herokuapp.com/task/delete/` + id, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.token
                    }
                });
                console.log(response);
                await context.dispatch('showNotes');

            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
            }
        },
        async shareNote(context,{id,contributorEmail,readerEmail}) {
            try {
                let alerts = [];
                const response = await axios.patch('https://taskprojectpanda.herokuapp.com/task/share/' + id, {
                    "contributors" : [contributorEmail],
                    "readers" : [readerEmail]
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + context.state.token
                    }
                });
                
                response.data &&  response.data.forEach(response => {
                    alerts.push(response);
                });

                return  alerts;

            } catch (error) {
                if(error.response && error.response.data && error.response.data.message){
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(error.message)
                }
            }
        },
        tryLogin(context){
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            context.state.token = token;
            context.state.user = user;
        }  
    },
    getters : {
        notes(state){
            return state.notes
        },
        token(state){
            return state.token
        },
        isAuthenticated(state){
            return !!state.token;
        },
        user(state){
            return state.user;
        }
    }
})