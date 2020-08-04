/**
 *
 */
function one() {
    var a = 1;
    function two() {
        var b = 2;
        function three() {
            var c = 3;
            console.log(a, b, c);
            debugger;
            // console.log('three');
        }
        three();
    }
    two();
}
one();