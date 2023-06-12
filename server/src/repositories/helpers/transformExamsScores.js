
exports.transformExamsScores = (examsScores) => {
    return examsScores.map((examScore) => {
        const item = examScore.toJSON();
        if (item.unit && item.unit.sections && item.unit.sections.length > 0) {
          console.log(item.unit.sections)
          item.unit.sections = item.unit.sections.map((section) => ({
            section: {
              id: section.id,
              name: section.name,
              arrangement: section.arrangement,
              type: section.type,
            },
            score:  section.examScores[0].score
          })).sort((a, b) => a.section.arrangement - b.section.arrangement);;
        }
        return item;
    });
}