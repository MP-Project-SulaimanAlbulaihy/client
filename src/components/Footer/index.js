import React from 'react'
import './style.css'

const Footer = () => {
    return (
        <div>
                <div class="footer-basic">
        <footer>
            <div class="social"><a href="#"><i class="icon ion-social-instagram"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-facebook"></i></a></div>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#" dir='rtl'>عن الموقع</a></li>
                <li class="list-inline-item"><a href="#">الصفحة الرئيسية</a></li>
                <li class="list-inline-item"><a href="#">الطلبات</a></li>
            </ul>
            <p class="copyright">جميع الحقوق محفوظة لدى جيراني © 2022</p>
        </footer>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>

        </div>
    )
}

export default Footer
