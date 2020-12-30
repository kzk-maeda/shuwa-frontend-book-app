jest.mock('./createBookReview')

import $ from 'jquery';
import createBookListItem from './createBookListItem';
import createBookReview from './createBookReview'
import { Book, Review } from './app';

describe('createBookListItem()', () => {
    const review1: Review = {
        id: 1,
        username: 'test user',
        comment: 'this book was interest',
        like: 3
    }

    const review2: Review = {
        id: 2,
        username: 'test user 2',
        comment: 'this book was interest',
        like: 0
    }

    const book: Book = {
        id: 1,
        title: 'フロントエンド開発',
        author: '執筆太郎',
        overview: 'フロントエンド開発をこれから始める方に最適な1冊です',
        image: 'https://example.com/image.png',
        reviews: [review1, review2]
    }

    test('should return DOM element', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect($('.book-list__item').length).toBe(1)
    })
    
    test('should match title & author', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect($('.book-list__item__inner__info__title').text()).toBe(`${book.title}(${book.author})`)
    })
    
    test('should match overview', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect($('.book-list__item__inner__info__overview').text()).toBe(book.overview)
    })
    
    test('should match image URL', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect($('.book-list__item__inner__image').prop('src')).toBe(book.image)
    })

    test('should match review count', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect($('.book-list__item__inner__info__comment__link').text()).toBe(`${book.reviews.length}件の感想・評価`)
    })
    
    test('should render review', () => {
        document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`
        expect(createBookReview).toHaveBeenCalledTimes(book.reviews.length)
    })
    
    
})
