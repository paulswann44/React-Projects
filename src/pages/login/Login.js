

function Login (){
    
//Create "handle login".
    // 1. event listener for each input
    // 2. crediedtials in an object
    // 3.  Make a POST request to the Spring Boot API endpoint to authenticate the user


    

    return(
        <div className="login-container">
    <form>
        <input type="text" className="login-form" id="username" placeholder="Username"/>
        <input type="password" className="login-form" id="passward" placeholder="Username"/>
        <label htmlFor="remember-me">Remember me</label>
        <input type="checkbox" className="" id="remember-me" placeholder="Username"/>
    </form>
    </div>
    )
}

export default Login;