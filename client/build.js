var resumeApp = {
    content: $('.content'),
    viewData: [],
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
        this.viewData = data.map(function (candidate) {
            return {
                name: candidate.contact_info.name.formatted_name,
                experience: self.getExperience(candidate.experience),
                img:candidate.contact_info.image_url
            }      
          });
    },
    getExperience: function (experience) {
        return experience.map(function (row) {
            return {
                workedAs: row.position_type,
                from: row.start_date,
                to: row.end_date
            }
        }) 
    },
    renderView: function (html) {
          this.content.html(html)
    },
    setView: function () {
         var html = '';
         this.viewData.forEach((candidate, cardIndex)=>{
            html += '<div class="card card_'+cardIndex+'">';
                html += '<div class="image-wrapper">';
                    html += '<img class="image" src="'+ candidate.img +'">';
                html += '</div>';
            html += '<div class="candidate">'+ candidate.name +'</div>';
            html += '<div class="info">';
            var allFlag = '';
            candidate.experience.forEach((job, experienceIndex)=>{
                allFlag = experienceIndex > 1 ? 'class="all"': '';
                html += '<div '+ allFlag +'>Worked as: '+ job.workedAs +', From: '+ job.from +', To: '+ job.to +'</div>';
            });
            if (allFlag.length){
                html +='<div class="more_or_less" onclick="resumeApp.showMore(' + cardIndex + ',this)">more &gt;&gt;</div>'
            }
            html +='</div>';
            html +='</div>'
         });

         this.renderView(html); 
    },
    showMore: function (cardIndex, element) {
          $('.card_' + cardIndex + ' .all').toggle();
          $(element).html() == 'more &gt;&gt;' ? $(element).html('less &lt;&lt;') : $(element).html('more &gt;&gt;')
    }
}

resumeApp.start();
