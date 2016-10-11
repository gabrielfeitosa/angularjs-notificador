(function () {

    angular.module('app', [])
        .factory('Notificador', function ($rootScope) {
            return {
                assinar: function (evento, scope, callback) {
                    var handler = $rootScope.$on(evento, callback);
                    scope.$on('$destroy', handler);
                },

                notificar: function (evento, dado) {
                    $rootScope.$emit(evento, dado);
                }
            };
        })
        .controller('LutadorA', function ($scope, Notificador) {
            var vm = this;
            vm.texto = 'Aguardando controlador!';
            Notificador.assinar('eventoA', $scope, alertar);

            function alertar(event, dado) {
                vm.texto = dado;
            }
        })
        .controller('LutadorB', function ($scope, Notificador) {
            var vm = this;
            vm.texto = 'Aguardando controlador!';
            Notificador.assinar('eventoB', $scope, alertar);

            function alertar(event, dado) {
                vm.texto = dado;
            }
        })
        .controller('Controlador', function (Notificador) {
            var vm = this;
            var comandos = ['Chuta', 'Grita', 'Soca', 'Deita', 'Pede Arrego'];

            function getComando() {
                return comandos[Math.floor(Math.random() * comandos.length)];
            }
            vm.notificarA= function () {
                Notificador.notificar('eventoA', getComando());
            }

            vm.notificarB = function () {
                Notificador.notificar('eventoB', getComando());
            }
        });;
})();