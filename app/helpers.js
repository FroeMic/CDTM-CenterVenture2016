
// takes two user profile objects and calculates their matching
function calculatePersonalityMatching(tenant, roomie) {
  var t = tenant.personalityProfile;
  var r = roomie.personalityProfile;
  if (t == null || t == undefined || t == '' || r == null || r == null || r == '') {
    return 0.0
  }

  var dividend = matchingScore(t,r);
  var divisor = fullScore(t);

  return dividend / divisor;
}

// takes the tenants profile and calculates the perfect score
function fullScore(tenantProfile) {
  var sum = 1.0 // birthday
  tenantProfile.values.forEach(function(value) {
    sum = sum + 1 * value.weight;
  })
  return sum;
}

function matchingScore(tenantProfile, roomieProfile) {
  var score = birthdayMatching(tenantProfile.birthday, roomieProfile.birthday);
  for (var i=0; i<tenantProfile.values.length; i++) {
    var t = tenantProfile.values[i];
    var r = roomieProfile.values[i];
    var maxDiff = Math.abs(t.max - t.min);
    score = score + ((maxDiff - Math.abs(t.value - r.value)) / maxDiff )* t.weight;
  }
  return score;
}

function birthdayMatching(b1, b2) {
  var diff = Math.abs(b1.getFullYear() - b2.getFullYear());
  if (diff <= 2) {
    return 1;
  } else if (diff <= 4) {
    return 0.75;
  } else if (diff <= 6) {
    return 0.5;
  } else if (diff <= 8) {
    return 0.25;
  } else {
    return 0.0;
  }
  return 0;
}

module.exports = {
    calculatePersonalityMatching: calculatePersonalityMatching
};