const Category = require('./models/category');
const Course = require('./models/course');
const ObjectId = require('mongoose').Types.ObjectId;


// 增加计算机分类
const computer_category = new Category({
    category_name: '计算机'
});

computer_category.save((err, result, numAffected) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`result: ${result}`);
    console.log(`numAffected: ${numAffected}`);
});

// 增加计算机网络课程
const computer_network = new Course({
    course_name: '计算机网络',
    teacher: '史政',
    picture: 'computer_network.png',
    category_id: new ObjectId('58df6bca77256724c43ab730'),
    description: '这门课讲述了计算机网络的基础知识',
    chapters: [
        {
            title: '概述',
            sections: [
                {title: '什么是网络', content: '内容由文本、图片、视频组成'},
                {title: '网络的分类', content: '内容由文本、图片、视频组成'}
            ]
        },
        {
            title: '物理层',
            sections: [
                {title: '物理层的基本概念', content: '内容由文本、图片、视频组成'},
                {title: '信道复用技术', content: '内容由文本、图片、视频组成'}
            ]
        }
    ],
    comments: [new ObjectId('58d226949f032426589c856e'), new ObjectId('495866949f0b3b265899a563')],
    be_liked: [new ObjectId('90d226949f0b3b26589c856e'), new ObjectId('58d226949f0b3b2658990003'), new ObjectId('58d226949f883b8658990563')],
});

computer_network.save((err, result, numAffected) => {
    if (err) {
        console.error(err.stack);
        return;
    }
    console.log(result);
    console.log(numAffected);
});