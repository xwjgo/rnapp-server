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
            title: '第一章 概述',
            sections: [
                {
                    title: '第一节 什么是网络',
                    video: '/videos/1.mp4',
                    html: '<p>由文本、图片组成</p>'
                },
                {
                    title: '第二节 网络的拓扑结构',
                    video: '/videos/1.mp4',
                    html: '<p>由文本、图片组成</p>'
                }
            ]
        },
        {
            title: '第二章 物理层',
            sections: [
                {
                    title: '第一节 物理层的基本概念',
                    video: '/videos/1.mp4',
                    html: '<p>由文本、图片组成</p>'
                },
                {
                    title: '第二节 信道复用技术',
                    video: '/videos/1.mp4',
                    html: '<p>由文本、图片组成</p>'
                }

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