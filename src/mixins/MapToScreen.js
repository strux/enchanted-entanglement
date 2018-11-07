var mapConversions = {
    methods: {
        mapToScreenCoord: function (coord) {
            return Math.floor(coord / 2)
        },
    },
    computed: {
        screenHeight: function() {
            return this.mapToScreenCoord(this.height)
        },
        screenWidth: function() {
            return this.mapToScreenCoord(this.width)
        },
        screenRow: function() {
            return this.mapToScreenCoord(this.row)
        },
        screenColumn: function() {
            return this.mapToScreenCoord(this.column)
        },
    },
}
export default mapConversions
