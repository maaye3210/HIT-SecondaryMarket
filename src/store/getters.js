const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  supplyAndDemand: state => state.home.list.supplyAndDemand,
  demandCount: (state) => {
    let sum = 0
    if (state.home.list.supplyAndDemand) {
      state.home.list.supplyAndDemand.demand.value.forEach(element => {
        sum += element
      })
    }
    return sum
  },
  supplyCount: (state) => {
    let sum = 0
    if (state.home.list.supplyAndDemand) {
      state.home.list.supplyAndDemand.supply.value.forEach(element => {
        sum += element
      })
    }
    return sum
  }
}
export default getters
