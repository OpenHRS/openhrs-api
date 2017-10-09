'use strict';
module.exports = function(mongoose) {
    let Schema = mongoose.Schema;
    let StatuteSchema = new Schema({
        url:String,
        year:String,
        division:String,
        division_text:String,
        volume:String,
        title:String,
        title_text:String,
        subtitle:String,
        subtitle_text:String,
        chapter:String,
        chapter_text:String,
        article:String,
        article_text:String,
        part:String, 
        part_text:String,
        subpart:String,
        section:String,
        section_text:String,
        text:[String],
        refs:[String]
    });

    mongoose.model('Statute', StatuteSchema, 'hrs-data');

    return this;
}
