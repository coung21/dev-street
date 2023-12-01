const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const tagModel = require('../models/tag.model')
const moment = require('moment')

class AdminService{
    static async NewPostEachDay() {
      const today = moment().startOf('day');
      const fromDate = moment(today).subtract(5, 'days'); // Ngày bắt đầu cụ thể
      const toDate = today; // Ngày hiện tại
  
      const dateArray = [];
      const currentDate = moment(fromDate);
  
      while (currentDate.isSameOrBefore(toDate, 'day')) {
        dateArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
      }
  
      const result = await postModel.aggregate([
        {
          $match: {
            date: {
              $gte: fromDate.toDate(),
              $lte: toDate.toDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' },
              day: { $dayOfMonth: '$date' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
            '_id.day': 1,
          },
        },
      ]);
  
      // Tạo một danh sách đầy đủ các ngày với số lượng bài viết là 0 cho những ngày không có bài viết
      const completeResult = dateArray.map((date) => {
        const existingData = result.find((item) => {
          return moment(`${item._id.year}-${item._id.month}-${item._id.day}`).format('YYYY-MM-DD') === date;
        });
  
        return {
          _id: {
            year: moment(date).year(),
            month: moment(date).month() + 1,
            day: moment(date).date(),
          },
          count: existingData ? existingData.count : 0,
        };
      });
      return completeResult
    }

    static async NewUserEachDay() {
      const today = moment().startOf('day');
      const fromDate = moment(today).subtract(5, 'days'); // Ngày bắt đầu cụ thể
      const toDate = today; // Ngày hiện tại
  
      const dateArray = [];
      const currentDate = moment(fromDate);
  
      while (currentDate.isSameOrBefore(toDate, 'day')) {
        dateArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
      }
  
      const result = await userModel.aggregate([
        {
          $match: {
            joinDate: {
              $gte: fromDate.toDate(),
              $lte: toDate.toDate(),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$joinDate' },
              month: { $month: '$joinDate' },
              day: { $dayOfMonth: '$joinDate' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
            '_id.day': 1,
          },
        },
      ]);
  
      // Tạo một danh sách đầy đủ các ngày với số lượng bài viết là 0 cho những ngày không có bài viết
      const completeResult = dateArray.map((date) => {
        const existingData = result.find((item) => {
          return moment(`${item._id.year}-${item._id.month}-${item._id.day}`).format('YYYY-MM-DD') === date;
        });
  
        return {
          _id: {
            year: moment(date).year(),
            month: moment(date).month() + 1,
            day: moment(date).date(),
          },
          count: existingData ? existingData.count : 0,
        };
      });
      return completeResult
    }

    // static async getAllUser(){
    //   const result = userModel.find()
    //   return result
    // }

    static async Createtag(name, theme){
      try {
        await tagModel.create({name, theme})
        return true
      } catch (error) {
        return error
      }
    }
}

module.exports = AdminService