require("./dbSetup.js").connect();

var User = require("./models/user");
var LocationBlog = require("./models/locationBlog");
var Position = require("./models/position");

 function userCreate(firstName,lastName,userName,password,type,company,companyUrl){
  var job = [{type,company,companyUrl},{type,company,companyUrl}];
  var userDetail = {firstName,lastName,userName,password,job};
  console.log("User was created!");
  var user = new User(userDetail);
  return user.save();
} 

function positionCreator(lon,lat,userId){
  var posDetail = {user:userId,loc:{coordinates:[lon,lat]}};
  var position = new Position(posDetail);
  console.log("Position was created!");  
  return position.save();
}

function LocationBlogCreator(info, author, longitude, latitude) {
  var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
  var blog = new LocationBlog(LocationBlogDetail);
  console.log("LocationBlog was created!");  
  return blog.save()
}

async function createUsers(){
  await User.remove({}); //Means delete everything
  await Position.remove({});
  await LocationBlog.remove({});
  var userPromises = [
    userCreate("Kurt","Wonnegut","aq","testA","xlx","comp5","comp.url"),
    userCreate("b","w","bw","testB","xwx","comp4","comp.url"),
    userCreate("c","r","cr","testC","xex","comp3","comp.url"),
    userCreate("d","t","dt","testD","xrx","comp2","comp.url"),
    userCreate("e","s","es","testE","xtx","comp1","comp.url")
  ];
  var users = await Promise.all(userPromises);
  var positionPromises = [
    positionCreator(123,432,users[0]._id),
    positionCreator(14,432,users[1]._id),
    positionCreator(13,432,users[2]._id),
    positionCreator(42,432,users[3]._id),
    positionCreator(77,432,users[4]._id)
  ];
  var positions = await Promise.all(positionPromises);

  var blogPromises = [
    LocationBlogCreator("Cool Place", users[0]._id, 12, 42),
    LocationBlogCreator("Another Cool Place", users[0]._id, 18, 18),
    LocationBlogCreator("Yet Another Cool Place", users[0]._id, 123, 432),
    LocationBlogCreator("The coolest Place", users[3]._id, 156, 56),
  ];
  var blogs = await Promise.all(blogPromises);




  //console.log(users);
  //console.log(positions);
  console.log(blogs);
}
createUsers();

// .then(user => {
//   console.log("########  USER  ########");
//   console.log(user);
  
//   LocationBlogCreator("Cool Place",user._id,26,148)
//   .then(blog => {
//    console.log("############  BLOG ############\n");
//    console.log(blog)})
//   .catch(err=> console.log(err));

//   positionCreator(156,26,user._id)
//   .then(p => {
//     console.log("########  POSITION ########\n");
//     console.log(p);
//   });
// })
// .catch(err=>console.log(err.message))