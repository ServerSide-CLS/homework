module.exports = {
  // <=
    le: function (value1, value2, block) {
        if (Number(value1) <= Number(value2)) {
            return block.fn(this);
        } else {
            return block.inverse(this);
        }
    },

    // >=
    ge: function (value1, value2, block) {
        if (Number(value1) >= Number(value2)) {
            return block.fn(this);
        } else {
            return block.inverse(this);
        }
    },

    // N1 - N2
    reduce: function (value1, value2) {
        return Number(value1) - Number(value2);
    },


    times: function (n, begin, end, block) {
        if (!begin)
            begin = 0;
        if (!end)
            end = n - 1;
        var accum = '';
        for (var i = begin; i <= end; ++i) {
            this.step = i;
            accum += block.fn(this);
        }
        return accum;
    },

    //判断相等
    equals: function (value1, value2, block) {
        if(Number(value1))
            value1 = Number(value1);
        if(Number(value2))
            value2 = Number(value2);

        if (value1 == value2) {
            return block.fn(this);
        } else {
            return block.inverse(this);
        }
    },

    // ++
    addOne: function (index) {
        return index + 1;
    },

    // N1 + N2
    add: function (value1, value2) {
        return Number(value1) + Number(value2);
    },

    // N1 - N2
    reduce: function (value1, value2) {
        return Number(value1) - Number(value2);
    }
};
