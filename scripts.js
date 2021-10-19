$(document).ready(()=>{
	(()=>{

		if (localStorage.length >= 1) {

			let keys = Object.keys(localStorage);
		    let i = keys.length;

		    console.log(keys);

		    while ( i-- ) 
		        render_product(localStorage.getItem(keys[i]));
		    
		}

	})();
})

$('#form_product').hide();

function new_product(){
	$('#products').hide();
	$('#form_product').show();
	// alert('Continuar a agregar un nuevo dispositivo?');
}

function cancel_new_product(){

	$('#products').show();
	$('#form_product').hide();

}

function show_password(ele){	

	if($(ele).is(":checked")){

		$('#password').attr('type','text');

    }else{

      	$('#password').attr('type','password');

    }
}

function item_menu(ele){
	$('[data-widget="treeview"] .nav-item .active').removeClass('active');
	$('#menu_'+ele).addClass('active');
}

// document.getElementsByClassName("btn-purchase").onclick = function() {addCar()};

function addCar(ele) {
    
    name = $(ele).parents('.white:first').find('.name').text();
    description = $(ele).parents('.white:first').find('.description').text();
    price = $(ele).parents('.white:first').find('.price').text();
    img = $(ele).parents('.white:first').find('img').attr("src");

	let product={
		name:name,
		description:description,
		price:price,
		img:img||null
	};

    $('#template_car_product a').clone().appendTo('#car_products');
    // console.log(name);
    $('#car_products a:last').find('.name').text(name);
    $('#car_products a:last').find('.description').text(description);
    $('#car_products a:last').find('.price').text(price);
    $('#car_products a:last').find('.img').attr('src',img);

    count = $('#car_products a').length;

    $('.count-car').text(count);

  //   if (addCar_new(product))
		// location.reload();

}

function render_product(product) {

	try{

		let infoProduct=JSON.parse(product.replace(/&quot;/g,'"'));
		
		let img='img/nuevo-producto.jpg';
		if(infoProduct.img !== null)
			img=infoProduct.img

		let htmlProduct=`
		<div class="white" id="">

	        <div class="row">
	          <div class="col-md-3 ">
	            <img src="${img}" alt="Imagen" class="img-product">
	          </div>
	          <div class=" col-md-6">
	            <h5><b class="name">${infoProduct.name}</b></h5>
	            <h6 class="description">
	            	${infoProduct.description}
	            </h6> 
	          </div>
	          <div class="col-md-3">
	           
	              <span class="descuento"> ${infoProduct.percentaje} % DE DESCUENTO</span>

	              <h5 class="price-after">$ ${infoProduct.price} COP</h5>            
	              <h4 class="price">$ ${infoProduct.new_price} COP</h4>  

	              <button class="btn-purchase" onclick="addCar(this)">AÑADIR AL CARRITO</button>

	          </div>
	        </div>
	      </div>
		`;
		
		$('#contenedorProductosRegistrados').append(htmlProduct);

	} catch(err) {
		console.log(err.message);
	}
}


$("#form_login").submit(function(e) {
    e.preventDefault();

    user = $('[name="user"]').val();
	pass = $('[name="password"]').val();

	result=0;

	if (user=='admin') {
		$('.text-user').text("");
		result=1;
		if (pass==1234) {
			$('.text-contrasena').text("");
			result=1;
		}else{
			$('.text-contrasena').text('La contraseña es incorrecta')
			result=0;
		}
	}else{
		$('.text-user').text('El nombre de usuario es incorrecto')
		result=0;
	}

	console.log(result);

	if (result == 1) {
		location.assign("products.html");
	}
});

function change_view(ele){

	$('.content-wrapper').hide();
	$('#'+ele).show();

}

function create_prduct(product){

	let index=parseInt($('.row').length);
	localStorage.setItem(index,JSON.stringify(product));

	return 1;
}

function addCar_new(product){

	let index=parseInt($('#car_products a').length);
	localStorage.setItem(index,JSON.stringify(product));

	return 1;
}

function format_number(number){
	return new Intl.NumberFormat("COP").format(number);
}

function get_new_price(price, percentaje_val){

	let calcule_price=((price*percentaje_val)/100);
	let new_price=price-calcule_price;

	return new_price;
}

$("#form_new_product").submit(function(e) {

    e.preventDefault();

	let price=parseFloat($('#price').val());
	let percentaje_val=parseFloat($('#percentajeVal').val());

	let new_price=get_new_price(price, percentaje_val);

	let product={
		name:$.trim($('#name').val()),
		price:format_number(price),
		percentaje:percentaje_val,
		new_price:format_number(new_price),
		description:$('#description').val(),
		img:$('#blah').attr('src')||null
	};

	if (create_prduct(product))
		location.reload();
});

function show_delete(ele){
	$(ele).find('.fa-trash').show();
}

function hide_delete(ele){
	$(ele).find('.fa-trash').hide();
}

function delete_product_branch(ele){

	$(ele).parents('a').remove();
	count = $('#car_products a').length;

    $('.count-car').text(count);
}
