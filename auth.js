async function register() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;


    if(password.length !== 4 || isNaN(password)) {
        alert("رمز باید دقیقا ۴ رقم باشد");
        return;
    }


    if(password !== confirmPassword) {
        alert("رمزها یکی نیستند");
        return;
    }


    const { data, error } = await supabaseClient
    .from("profiles")
    .insert([
        {
            username: username,
            password: password,
            points: 50
        }
    ]);


    if(error) {
        alert("ثبت نام انجام نشد");
        console.log(error);
    }
    else {
        alert("ثبت نام موفق بود. ۵۰ امتیاز هدیه گرفتی 🎁");
    }

}



async function login() {

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;


    const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();


    if(error) {

        alert("نام کاربری یا رمز اشتباه است");

    }

    else {

        alert("خوش آمدی " + username);

        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

    }

}
