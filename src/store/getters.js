const getters = {
    id: state =>state.user.id,
    studentId: state =>state.user.studentId,
    teacherId: state =>state.user.teacherId,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.name,
    realName: state => state.user.realName,
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters

};
export default getters

