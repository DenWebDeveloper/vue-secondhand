<template>
    <header>
        <div class="container">
            <div class="row border-bottom align-items-center">
                <div class="col-6 col-sm-4 py-3">
                    <ul class="socials d-flex list-unstyled">
                        <li class="socials__item"><a class="socials__link" href="#"><span class="d-none">Facebook</span><i
                                class="fab fa-facebook-f"></i></a></li>
                        <li class="socials__item"><a class="socials__link" href="#"><span
                                class="d-none">Twitter</span><i class="fab fa-twitter"></i></a></li>
                        <li class="socials__item"><a class="socials__link" href="#"><span
                                class="d-none">Google plus</span><i class="fab fa-google"></i></a></li>
                        <li class="socials__item"><a class="socials__link" href="#"><span
                                class="d-none">Instagram</span><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
                <div class="col-7 col-sm-5 col-lg-3 text-muted ml-auto py-3">
                    <small><i class="far fa-envelope"></i><a class="text-muted font-weight-bold"
                                                             href="mailto:testgmail.g@gmail.com">testgmail.g@gmail.com</a>
                    </small>
                </div>
                <div class="col-5 col-sm-3 col-lg-2 py-3">
                    <small class="text-muted font-weight-bold"><i class="far fa-clock"></i> 9:00 - 18:00</small>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>
