const apiUrl = "https://api.github.com/users/";
const main = document.querySelector(".main-container");
const gitHubUrl = "https://github.com/";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const moonImg = './assets/images/moon-icon.svg';
const sunImg = './assets/images/sun-icon.svg';
const wrapperBox = document.querySelector(".wrapper");
const themeName = document.querySelector(".themename");
const notFound = document.querySelector(".warning");

const themeImg = document.querySelector(".moonImg");
let darkModeOn = false;

function switchMode() {
    // Check for part of the path instead of the full URL

    if (themeImg.src.includes("moon-icon")) {
        themeImg.src = './assets/images/sun-icon.svg';
        wrapperBox.classList.add("active");
        themeName.innerHTML = "LIGHT";
        darkModeOn = true;

    } else {
        themeImg.src = './assets/images/moon-icon.svg';
        wrapperBox.classList.remove("active");
        themeName.innerHTML = "DARK";
        darkModeOn = false;

    }
}

const getUser = async (username) => {
    const response = await fetch(apiUrl + username);
    const data = await response.json();
    if(data.status === "404"){
        notFound.classList.add("active");
        return;
    }
    notFound.classList.remove("active");
    console.log(data);
    const originalDateStr = data.created_at;
    const originalDate = new Date(originalDateStr);

    const userCard = `
    <form action="" class="search-bar" onsubmit="return formSubmit()">
    <input id="search" class="searchUserName" type="text" name="search" placeholder="Enter a GitHub username...">
    </form>

<div class="userCard">
<div class="userImage">
    <img class="userImgMain" src="${data.avatar_url}" alt="" width="100px" height="100px">
</div>
<div class="right-container">
    <div class="userInfo">
        <div class="nameAndId">
            <h3>${data.name}</h3>
            <a href="https://github.com/${username}" target="_blank">${data.login}</a>

        </div>
        <div class="joinDate">
            <p>Joined</p>
            <p>${originalDate.getDate()} ${monthNames[originalDate.getMonth()]} ${originalDate.getFullYear()}</p>
        </div>
    </div>
    <div class="userDesciption">
        <p>${data.bio}</p>
    </div>
    <div class="followersFollwingAndRepo">
        <div class="repos userdivs">
            <p class="info">Repos</p>
            <p class="datauser">${data.public_repos}</p>
        </div>
        <div class="followers userdivs">
            <p class="info">Followers</p>
            <p class="datauser">${data.followers}</p>
        </div>
        <div class="following userdivs">
            <p class="info">Following</p>
            <p class="datauser">${data.following}</p>
        </div>
    </div>
    <div class="placeSocialetc">
        <div class="userPlace userlocLIinkTwitterComp">
            <img src="./assets/images/location-icon.svg" alt="">
            <p>${data.location || "Not available"}</p>
        </div>
        <div class="userLink userlocLIinkTwitterComp">
            <img src="./assets/images/website-icon.svg" alt="">
            <p>${data.blog || "Not available"}</p>
        </div>
        <div class="userTwitter userlocLIinkTwitterComp">
            <img src="./assets/images/twitter-icon.svg" alt="">
            <p>${data.twitter_username || "Not available"}</p>
        </div>
        <div class="userCompany userlocLIinkTwitterComp">
            <img src="./assets/images/company-icon.svg" alt="">
            <p>${data.company || "Not available"}</p>
        </div>
    </div>
</div>
</div>
`
main.innerHTML = userCard;

}
getUser("abhisheknaiidu");
const formSubmit = () => {
    const searchBox = document.querySelector("#search");
    if (searchBox.value) {
        getUser(searchBox.value);
    }
    return false;
}
