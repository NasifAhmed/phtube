// This gets the category list data from api
// Returns an Array of category object
async function getCategory() {
    // Fetching the data from api
    const rawResponse = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );
    const jsonData = await rawResponse.json();
    categories = jsonData.data;

    const categoryBtnContainer = document.getElementById(
        "category-btn-container"
    );
    categories.forEach((categoryObject) => {
        let categoryBtn = document.createElement("div");
        categoryBtn.innerHTML = `
        <button class="rounded bg-red-600 text-white px-4 py-2 font-medium text-lg" onclick="getVideo(${categoryObject.category_id})">${categoryObject.category}</button>`;
        categoryBtnContainer.appendChild(categoryBtn);
    });
}

async function getVideo(categoryId = 1000, sortCheck = false) {
    // Fetching the data from api
    const rawResponse = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const jsonData = await rawResponse.json();
    console.log(jsonData.data);
    videos = jsonData.data;
    if (sortCheck) {
        // using videos.slice() to empty slice the array and pass that
        // otherwise the array reference gets passed not values.
        videos = sortByViews(videos.slice());
    }

    const sortBtn = document.getElementById("sort-btn");
    sortBtn.setAttribute(`onclick`, `getVideo(${categoryId}, true)`);

    const videoCardContainer = document.getElementById("video-card-container");
    // Clearing previous html elements
    videoCardContainer.innerHTML = ``;
    console.log(`TEST : ${videos.length}`);
    if (videos.length === 0) {
        videoCardContainer.classList.remove("grid");
        let noVideo = document.createElement("div");
        noVideo.innerHTML = `
        <section class="flex flex-col items-center justify-center gap-5 pt-40">
            <img src="assets/Icon.png" alt="">
            <h1 class="text-4xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
        </section>
        `;
        videoCardContainer.appendChild(noVideo);
    } else {
        videoCardContainer.classList =
            "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10";
        // Looping in each array element and showing it on html
        videos.forEach((videoObject) => {
            let videoCard = document.createElement("div");
            videoCard.classList = "flex flex-col items-center";
            videoCard.innerHTML = `
        <div>
            <div class="relative">
                <img src="${
                    videoObject.thumbnail
                }" class="rounded-xl h-52 w-80 object-cover -z-10" />
                <h2 id="video-date" class="w-fit absolute bottom-3 right-3 p-1 text-end text-xs font-normal text-white bg-black rounded z-20 ${
                    videoObject.others.posted_date === "" ? "hidden" : "visible"
                }">${formatSeconds(videoObject.others.posted_date)}</h2>
            </div>
            <div class="video-card-content flex justify-start items-start gap-4 mt-5">
                <div>
                    <img class="rounded-full h-10 w-10 object-cover" src="${
                        videoObject.authors[0].profile_picture
                    }">
                </div>
                <div class="items-start justify-start">
                    <h2 class="text-base font-bold">${videoObject.title}</h2>
                    <h3 class="text-sm font-normal">${
                        videoObject.authors[0].profile_name
                    }    ${
                videoObject.authors[0].verified === true
                    ? '<i class="fa-solid fa-circle-check text-blue-600"></i>'
                    : ""
            }</h3>
                    <h3 class="text-sm font-normal">${
                        videoObject.others.views
                    } views</h3>
                </div>
            </div>
        </div>`;
            videoCardContainer.appendChild(videoCard);
        });
    }
}

function sortByViews(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let largest = i;
        for (let j = i + 1; j < len; j++) {
            if (
                parseFloat(arr[j].others.views.slice(0, -1)) * 1000 >
                parseFloat(arr[largest].others.views.slice(0, -1)) * 1000
            ) {
                largest = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
    }
    return arr;
}

function formatSeconds(s) {
    sec = parseInt(s);
    const hour = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    if (hour > 0 && min > 0) {
        return `${hour}hrs ${min} min ago`;
    } else if (hour > 0 && min <= 0) {
        return `${hour}hrs ago`;
    } else if (hour <= 0 && min > 0) {
        return `${hour}hrs ago`;
    } else {
        return `${sec} seconds ago`;
    }
}

getCategory();
getVideo();
