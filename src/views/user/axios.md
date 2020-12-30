/api/nesarc/user/getData获取用户列表
response: {
    code: 0,
    data: {total: 2, rows: [
        {
            @id: 1,
            account: "admin",
            id: "5CD266B4B20BF92B44089D25",
            roleNameOfU: "管理员",
            sex: "男",
            userName: "蒋红星",
            userPwd: "202CB962AC59075B964B07152D234B70",
            userRoleId: "5D07361F0EA7940D003508FE"
        }
    ]},
    desc: ""
},
success: true

/api/nesarc/user/add添加用户
post
参数：
account;用户名
userRoleId，角色代码
sex;性别
userName;姓名
userPwd;密码

/api/nesarc/user/delete删除用户
post
参数：id

/api/nesarc/role/getRoleList获取角色列表
get

角色管理：
/api/nesarc/role/getData 角色列表
/api/nesarc/role/save新增:
roleName isAdmin(1是0否）menuId(多个用,隔开 ）
/api/nesarc/role/update修改
/api/nesarc/role/remove删除(参数id)