
CREATE TABLE produtos(
	id_produto SERIAL PRIMARY KEY,
	nome_produto VARCHAR(100) NOT NULL,
	preco DECIMAL(10,2) NOT NULL,
	link_imagem TEXT NOT NULL,
	frete_gratis BOOLEAN DEFAULT FALSE
);
ALTER TABLE produtos
ADD COLUMN link_produto TEXT;

INSERT INTO produtos (nome_produto, preco, link_imagem, frete_gratis, link_produto)
VALUES ('Notebook', 3500.00, 'https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1439/large/notebook-positivo-celeron-c4128-motion-c-tela-antirreflexiva-141-cinza_13915.jpg', true, 'https://www.google.com/search?q=notebook&sca_esv=4383f7dd9720c753&rlz=1C1GCEA_pt-BRBR1199BR1200&udm=2&biw=666&bih=730&sxsrf=ANbL-n4UZT69mlAoAPD3cFb8KZT-bDwgJQ%3A1774021688939&ei=OGy9afj8ONLK1sQP6pCRkQ0&ved=0ahUKEwj4-N7k6a6TAxVSpZUCHWpIJNIQ4dUDCBI&uact=5&oq=notebook&gs_lp=Egtnd3Mtd2l6LWltZyIIbm90ZWJvb2syBxAjGCcYyQIyCBAAGIAEGLEDMgQQABgDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixA0ihFFC_BVi0EXACeACQAQCYAXugAfICqgEDMC4zuAEDyAEA-AEBmAIFoAKJA8ICEBAAGIAEGLEDGEMYgwEYigXCAgYQABgHGB7CAgsQABiABBixAxiDAcICBRAAGIAEwgIKEAAYgAQYQxiKBcICEBAAGIAEGLEDGIMBGIoFGArCAg0QABiABBixAxhDGIoFmAMAiAYBkgcDMi4zoAeeErIHAzAuM7gHggPCBwUwLjIuM8gHEYAIAA&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLTFYNzNWY2JJU1BhdEZNMg4xWDczVmNiSVNQYXRGTToObUVQV0pzSGhyWlVqRU0gBCocCgZtb3NhaWMSEGUtMVg3M1ZjYklTUGF0Rk0YADABGAcg1fiHswQwAkoIEAEYASABKAE');
INSERT INTO produtos (nome_produto, preco, link_imagem, frete_gratis, link_produto)
VALUES('Monitor', 900.00, 'https://m.media-amazon.com/images/I/71Qt-mok7UL._AC_SY450_.jpg', false, 'https://www.amazon.com.br/Monitor-AOC-Ajuste-Altura-24G4/dp/B0DLPB4CH6/ref=asc_df_B0DLPB4CH6?mcid=5f7bfa556d0139c282f556ef4f85b5bd&tag=googleshopp00-20&linkCode=df0&hvadid=709884378187&hvpos=&hvnetw=g&hvrand=13996261029355822752&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9100681&hvtargid=pla-2398944014062&psc=1&hvocijid=13996261029355822752-B0DLPB4CH6-&hvexpln=0&language=pt_BR');