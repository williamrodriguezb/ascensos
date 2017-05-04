
// var estado = '';

$(function () {
	if ($('#btn-estado').is(':checked')) {

		// $('.btn-outline-primary').show();
		$("#btn-estado").attr('value', 'SI');
		$('#valor').text($('#btn-estado').attr('value'));
		 
	}else{
		// $('.btn-outline-primary').hide();
		$("#btn-estado").attr('value', 'SI')
		$('#valor').text($('#btn-estado').val());
		 

	}
});
$('#btn-estado').change(function() {
	if ($('#btn-estado').is(':checked')) {
		$('.btn-outline-primary').show();
		 $("#btn-estado").val("SI");
		$('#valor').text($('#btn-estado').val());

	}else{
		// $('.btn-outline-primary').hide();
		$("#btn-estado").attr('value', 'NO');
		$('#valor').text($('#btn-estado').val());
		
	}	
});






	







