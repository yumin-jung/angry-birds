class ScoreDisplay {
    constructor() {
        this.score = 0;
    }
    resetScore() {
        this.score = 0;
        document.getElementById('score').innerHTML = `Score: ${this.score}`;
    }
    addScore(scoreToAdd) {
        this.score += scoreToAdd;
        document.getElementById('score').innerHTML = `Score: ${this.score}`;
    }
    // update(source, ...others) {
    //     if (source == 'gunshoot' || source == 'gunreload') {
    //         const { remainingShots } = others[0];
    //         this.setBullets(remainingShots);
    //     } else if (source == 'score') {
    //         const { points } = others[0];
    //         this.addScore(points);
    //     }
    // }
}

export { ScoreDisplay };
