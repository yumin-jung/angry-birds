class ScoreDisplay {
    constructor() {
        this.remainingBirds = 3;
        this.score_stage1 = 0;
        this.score_stage2 = 0;
        this.score_stage3 = 0;
        this.score_stage4 = 0;
    }
    scoreToStar(score) {
        if (score > 0) {
            return 3;
        }
    }
    updateStar(stageName) {
        if (stageName == "stage1") {
            document.getElementById('score1').innerHTML = `high record : ⭐️ ⭐️ ⭐️`;
            document.getElementById('stage1-star').innerHTML = `⭐️ ⭐️ ⭐️`;
        } else if (stageName == "stage2") {
            document.getElementById('score2').innerHTML = `high record : ⭐️ ⭐️ ⭐️`;
            document.getElementById('stage2-star').innerHTML = `⭐️ ⭐️ ⭐️`;
        } else if (stageName == "stage3") {
            document.getElementById('score3').innerHTML = `high record : ⭐️ ⭐️ ⭐️`;
            document.getElementById('stage3-star').innerHTML = `⭐️ ⭐️ ⭐️`;
        } else if (stageName == "stage4") {
            document.getElementById('score4').innerHTML = `high record : ⭐️ ⭐️ ⭐️`;
            document.getElementById('stage4-star').innerHTML = `⭐️ ⭐️ ⭐️`;
        }
    }

    update(source, ...others) {
        if (source == 'update-score-stage1') {
            const { remainingBirds } = others[0];
            const { scoreToAdd } = others[1];
            this.score_stage1 += scoreToAdd;
            this.remainingBirds = remainingBirds;
            this.updateStar("stage1");
        } else if (source == 'update-score-stage2') {
            const { remainingBirds } = others[0];
            const { scoreToAdd } = others[1];
            this.score_stage2 += scoreToAdd;
            this.remainingBirds = remainingBirds;
            this.updateStar("stage2");
        } else if (source == 'update-score-stage3') {
            const { remainingBirds } = others[0];
            const { scoreToAdd } = others[1];
            this.score_stage3 += scoreToAdd;
            this.remainingBirds = remainingBirds;
            this.updateStar("stage3");
        } else if (source == 'update-score-stage4') {
            const { remainingBirds } = others[0];
            const { scoreToAdd } = others[1];
            this.score_stage4 += scoreToAdd;
            this.remainingBirds = remainingBirds;
            this.updateStar("stage4");
        }
    }
}

export { ScoreDisplay };
