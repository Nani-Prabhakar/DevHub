//authentication
post:signUp
post:logIn
post:logOut

//profile
get:profile/view
patch:profile/edit
path:profile/password

//request
post:request/like/:userId
post:request/pass/:userId
get:request/like/:reqId
get:request/pass/:reqId

//feed