# css_new

1 ПЕРЕМЕННЫЕ

:root {
--red: #e25a5a;
--gray: #4b4848;
--jellow: #c8d333;
}

Вызывается - var(--red)

2 ПРОПОРЦИИ

вместо высоты соотношение сторон

width: 100%;
aspect-ratio: 16/9;

для вкладки в блок фото или видео хорошо работает

video (img) {
object-fit: cover;
width: 100%;
height: 100%;
}

3 ПРОПОРЦИОНАНЫЙ ШРИФТ

font-size: clamp(1.5rem, calc(0.91rem + 2.93vw), 3rem);

Меняется адаптивно от ширены экрана https://www.marcbacon.com/tools/clamp-calculator/

4 СКРОЛЫ

11м 07с
