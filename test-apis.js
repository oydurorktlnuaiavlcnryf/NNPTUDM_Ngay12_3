const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); 
// wait we can just use native fetch since it's Node v18+ but let's just write a simple test script

async function run() {
    try {
        console.log("1. Creating Role...");
        let resRole = await fetch("http://localhost:3000/api/v1/roles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Staff " + Date.now(), description: "Staff role" })
        });
        let role = await resRole.json();
        console.log("Role =>", role);

        console.log("\n2. Creating User...");
        let resUser = await fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "staffuser" + Date.now(),
                password: "Password123!",
                email: "staff" + Date.now() + "@gmail.com",
                fullName: "Staff Test",
                role: role._id
            })
        });
        let user = await resUser.json();
        console.log("User =>", user);

        console.log("\n3. Testing Enable User API...");
        let resEnable = await fetch("http://localhost:3000/api/v1/users/enable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                username: user.username
            })
        });
        let enabledUser = await resEnable.json();
        console.log("Enabled User Status =>", enabledUser.status);

        console.log("\n4. Testing Disable User API...");
        let resDisable = await fetch("http://localhost:3000/api/v1/users/disable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                username: user.username
            })
        });
        let disabledUser = await resDisable.json();
        console.log("Disabled User Status =>", disabledUser.status);

        console.log("\n5. Testing Get Users By Role API...");
        let resRoleUsers = await fetch(`http://localhost:3000/api/v1/roles/${role._id}/users`);
        let roleUsers = await resRoleUsers.json();
        console.log("Role Users Count =>", roleUsers.length);
        console.log("Role Users[0].username =>", roleUsers[0]?.username);

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
