var express = require('express');
var router = express.Router();
//数据库
var stuDAO = require("../bin/stuDAO.js");

//      use("/stu");

//将本路由中所有的接口都加一个1秒的延迟
// router.use((req,res,next)=>{
//   setTimeout(function() {
//     next();
//   }, 1000);
// });

/* 添加学生接口 */
router.post("/add",function(req,res){
  var s = new stuDAO(req.body);
  s.save()
  .then(function(){
    res.json({err:0,msg:"添加成功"});
  })
  .catch(function(){
    res.json({err:1,msg:"添加失败"});
  });
});

//按照条件查询某一页的学生
router.get("/",function(req,res){
  // console.log(req.query);
  //从参数中过滤出查询条件
  var condition = {};//查询条件
  //如果发过来的请求中包含这些参数，那么我们把这些参数作为查询的条件来用
  if(req.query.age){
    condition.age = req.query.age//年龄
  }
  if(req.query.gender){//性别
    condition.gender = req.query.gender
  }
  if(req.query.name){//姓名
    condition.name = new RegExp(req.query.name);
  }
  if(req.query.tel){//电话
    condition.tel = new RegExp(req.query.tel);
  }

  //排序条件
    //如果请求中带有sortByAge参数，那么我们就按照age的大小进行排序
  var sortCon = {};
  if(req.query.sortByAge){//通过年龄排序
    sortCon.age = req.query.sortByAge=="升序"?1:-1;
  }


    stuDAO.find().limit(parseInt(req.query.page)).then(function(data){
        res.json({data:data});

});

//删除接口
router.get("/delete",(req,res)=>{
  stuDAO.remove(req.query)
  .then(function(){
    res.json({err:0,msg:"删除成功"});
  });
});

  //修改接口（编辑）
  router.get("/edit",(req,res)=>{

    stuDAO.update({_id:req.query._id},{
      $set:{
        tel:req.query.tel,
        age:req.query.age,
        gender:req.query.gender,
      }
    })
    .then(()=>{
      res.json({err:0,msg:"修改成功"});//msg：提示信息
    });

  });
});




module.exports = router;//暴露模块


//http://www.kuaidi100.com/query?postid=886181152366499146&type=yuantong