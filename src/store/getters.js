let getters = {
  token:state => {return state.user.token},
  avatar:state => {return state.user.avatar},
  name:state => {return state.user.name},
  roles:state => {return state.user.roles},
}

export default getters