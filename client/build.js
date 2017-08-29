var resumeApp = {
    content: $('.content'),
    viewData: '',
    start: function(argument) {
        this.getData()
    },
    getData: function _getData() {
        var self = this;
        return $.get('/get-data/',function(res){
            self.prepareView(JSON.parse(res));
            self.setView();
        })
    },
    prepareView: function (data) {
        var self = this;
        this.viewData = data.map(function (row) {
            return {
                name: row.contact_info.name.formatted_name,
                experience: self.getExperience(row.experience),
                img:row.contact_info.image_url
            }      
          });
    },
    getExperience: function (data) {
        return data.map(function (row) {
            return {
                workedAs: row.position_type,
                from: row.start_date,
                to: row.end_date
            }
        }) 
    },
    renderView: function (output) {
          this.content.html(output)
    },
    setView: function () {
         var output = '';
         this.viewData.forEach((row, card_index)=>{
            output += '<div class="card card_'+card_index+'">';
                output += '<div class="image-wrapper">';
                    output += '<img class="image" src="'+ row.img +'">';
                output += '</div>';
            output += '<div class="candidate">Hello'+ row.name +'</div>';
            output += '<div class="info">';
            var allFlag;
            row.experience.forEach((job, experience_index)=>{
                allFlag = experience_index > 1 ? 'class="all"': '';
                output += '<div '+ allFlag +'>Worked as: '+ job.workedAs +', From: '+ job.from +', To: '+ job.to +'</div>';
            });
            if (allFlag){
                output +='<div class="more_or_less" onclick="resumeApp.showMore(' + card_index + ',this)">more &gt;&gt;</div>'
            }
            output +='</div>';
            output +='</div>'
         });

         this.renderView(output); 
    },
    showMore: function (index, element) {
          $('.card_' + index + ' .all').toggle();
          $(element).html() == 'more &gt;&gt;' ? $(element).html('less &lt;&lt;') : $(element).html('more &gt;&gt;')
    }
}

resumeApp.start();
