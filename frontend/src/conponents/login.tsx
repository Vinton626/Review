import { Input, Button } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export function Login({onSwitch}:{onSwitch:()=>void}){
    return(
        <>
        <div>
            <UserOutlined style={{ position:"relative", fontSize:'128px', color:'grey', bottom:64}}/>
        </div>
        <form>
            <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined/>}/>
            <Input size="large" placeholder="请输入密码" prefix={<LockOutlined />}/>
            <Button type="primary" size="large" style={{width:128, position:"relative", top:32, right:32}}>登录</Button>
            <Button onClick={onSwitch} size="large" style={{width:128, position:"relative", top:32, left:32}}>注册</Button>
        </form>
        </>
    )
}