console.log('sanity check');

// Reveal Landing Page
$('#navLogo').click ( () => {
    $('#landingPage').css('display', 'flex');
    $('main').css('display', 'none');
})

// Reveal Market
$('#landingPage').click( () => {
    $('.marketPlace').css('display', 'block');
    $('#landingPage').css('display', 'none');
    $('main').css('display', 'block');
});

$('#navMarket').click( () => {
    $('.marketPlace').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal User Create
$('#navCreateUser').click( () => {
    $('.userCreatePage').css('display', 'block');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal Profile
$('#navProfile').click( () => {
    $('.profilePage').css('display', 'block');
    $('.userCreatePage').css('display', 'none');
    $('.marketPlace').css('display', 'none');
    $('.flowerCreatePage').css('display', 'none');
});

// Reveal Flower Create
$('#navCreateFlower').click( () => {
    $('.flowerCreatePage').css('display', 'block');
    $('.marketPlace').css('display', 'none');
    $('.userCreatePage').css('display', 'none');
    $('.profilePage').css('display', 'none');
});

// Reveal Profile Products
$('#showProduct').click( () => {
    $('.products').css('display', 'flex');
    $('.favorites').css('display', 'none');
});

// Reveal Profile Favorites
$('#showFavorite').click( () => {
    $('.favorites').css('display', 'flex');
    $('.products').css('display', 'none');
});

// Reveal Shopping Cart
$('#navCart').click( () => {
    $('.cart').css('display', 'flex');
})

$('#hide').click( () => {
    $('.cart').css('display', 'none');
})

var usersList;
var allUsers = [];

$(document).ready(()=>{
    $usersList = $('#userTarget');
    $.ajax({
        method: 'GET',
        url: '/api/users',
        success: handleSuccess,
        error: handleError
    });


    $('#newUserForm').on('submit', e => {
        e.preventDefault();
        console.log('submit and get new user.....!!!!!!!!!');
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: $(this).serialize(),
        success: newUserSuccess,
        error: newUserError
        });
    });



    $usersList.on('click', '.deleteBtn', (() => {
        console.log('clicked delete button to', '/api/users/'+$(this).attr('data-id'));
    $.ajax({
        method: 'DELETE',
        url: '/api/users/'+$(this).attr('data-id'),
        success: deleteUserSuccess,
        error: deleteUserError
        });
    }));


});

const getUserHtml = user =>{
    return `<hr>
            <p>
            <b>${user. fullName}</b>
            <b>${user. email}</b>
            <b>${user. image}</b>
            <b>${user. dob}</b>
            <b>${user. products}</b>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${user._id}>Delete</button>
            </p>`;

};

const getAllUsersHtml = users => {
    console.log(users)
    return users.map(getUserHtml).join("");
};

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
const render = () => {
    $usersList.empty();
    var usersHtml = getAllUsersHtml(allUsers);
    $usersList.append(usersHtml);
};


const handleSuccess = json =>{
    allUsers = json;
    render();
};

const handleError = e => {
    console.log('uh oh');
    $('#userTarget').text('Failed to load users, is the server working?');
};

const newUserSuccess = json =>{
    console.log(json)
    $('#newUserForm input').val('');
    allUsers.push(json);
    render();
}

const newUserError = ()=>{
    console.log('newUser error!');
}


const deleteUserSuccess = json => {
    var user = json;
    console.log(json);
    var userId = user._id;
    console.log('delete user', userId);
    // find the user with the correct ID and remove it from our allUsers array
    for(var i = 0; i< allUsers.length; i++) {
        if(allUsers[i]._id === userId) {
        allUsers.splice(i, 1);
        break;  // we found our user - no reason to keep searching (this is why we didn't use forEach)
        }
    }
    render();
};

    const deleteUserError = ()=> {
    console.log('deleteuser error!');
};
