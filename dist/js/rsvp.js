function dropdownRSVP(e) {
    let adult = document.getElementById("rsvp-adults")
    let kid = document.getElementById("rsvp-kids")
    if (e.value == "yes") {
        adult.disabled = false;
        kid.disabled = false;
    } else {
        adult.disabled = true;
        kid.disabled = true;
        adult.value = '0'; 
        kid.value = '0'; 
    }
}

function sendKakaoLink() {
    Kakao.Link.sendScrap({
    requestUrl: 'http://localhost:5002',
    templateId: 92087,
    templateArgs: {
        TITLE: '제목',
        DESC: '설명'
    },
    });
};

async function sendLink() {
    let websiteData = {
        title: '결혼합니다',
        text: '9/2일 토요일 오후 12:00 보코강남호텔',
        url: 'https://google.com'
    };
    try {
        let result = await navigator.share(websiteData);
    } catch(err) {
        console.log(err);
        window.alert('모바일 전용 기능입니다');
    }
}

function suzyParentPhone() {
    console.log('close');
    let suzyParent = document.getElementById('suzy-parent-phone');
    let modal = document.getElementById('suzy-parent-modal');
    let overlay = document.getElementById('suzy-parent-overlay');
    let close = document.getElementById('suzy-parent-modal-close');
    let copy = document.getElementById('suzy-parent-modal-copy');
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    const closeModal = function() {
        overlay.classList.add("hidden");
        modal.classList.add("hidden");
    }
    close.onclick = function() {
        closeModal();
    }
    copy.onclick = function() {
        var copyText = document.getElementById('suzy-parent-account');
        var hiddenField = document.getElementById('suzy-parent-copyText');
        hiddenField.value = copyText.innerHTML;
        hiddenField.select();
        navigator.clipboard.writeText(hiddenField.value);
        alert("복사되었습니다");
    }
    overlay.addEventListener("click", closeModal);
}

function insertSuzyParentPhoneModal() {
    console.log("here");
    let element = document.getElementById("suzy-parent-phone");
    let feed = document.createElement("div");
    feed.innerHTML = "<div id='suzy-parent-overlay' class='overlay hidden'></div>" +
    "<div id='suzy-parent-modal' class='flex modal hidden'>" +
    "<div class='modal-content'>" +
    "<h2>" + "신부" + "</h2>" +
    "<hr class='solid'>" +
    "<h3>" + "010-9552-9185" + "</h3>" +
    "<button class='comment-button'>" + "복사하기" + "</button><button class='comment-button' id='suzy-parent-modal-close'>" + "닫기" + "</button>" +
    "</div>" +
    "</div>";
    element.append(feed);
}


window.onload = function() {
    const jiwoong = document.getElementById('jiwoong-phone');
    const modal = document.querySelector(".modal");
    var close = document.getElementById("close");
    const overlay = document.querySelector(".overlay");
    jiwoong.onclick = function() {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }
    const closeModal = function() {
        overlay.classList.add("hidden");
        modal.classList.add("hidden");
    }
    close.onclick = function() {
        closeModal();
    }
    overlay.addEventListener("click", closeModal);
    Kakao.init('9f6cd19252f35ef0f607f25f1e78b835');
    //insertSuzyParentPhoneModal();
}

